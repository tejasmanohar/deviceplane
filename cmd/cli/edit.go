package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"

	"github.com/deviceplane/deviceplane/pkg/client"
	"github.com/urfave/cli"
)

var edit = cli.Command{
	Name: "edit",
	Flags: []cli.Flag{
		cli.StringFlag{
			Name: "project",
		},
		cli.StringFlag{
			Name: "application",
		},
	},
	Action: func(c *cli.Context) error {
		accessToken := c.GlobalString("access-token")
		client := client.NewClient(accessToken, nil)

		projectID := c.String("project")
		applicationID := c.String("application")

		release, err := client.GetLatestRelease(context.TODO(), projectID, applicationID)
		if err != nil {
			return err
		}

		tmpfile, err := ioutil.TempFile("", "")
		if err != nil {
			return err
		}
		defer os.Remove(tmpfile.Name())

		if _, err := tmpfile.Write([]byte(release.Config)); err != nil {
			return err
		}

		editor := os.Getenv("EDITOR")
		if editor == "" {
			editor = "vi"
		}

		cmd := exec.Command(editor, tmpfile.Name())
		cmd.Stdin = os.Stdin
		cmd.Stdout = os.Stdout
		cmd.Stderr = os.Stderr

		if err = cmd.Run(); err != nil {
			fmt.Println("Edit cancelled, no changes made.")
			return nil
		}

		if err := tmpfile.Close(); err != nil {
			return err
		}

		configFile, err := os.Open(tmpfile.Name())
		if err != nil {
			return err
		}

		configBytes, err := ioutil.ReadAll(configFile)
		if err != nil {
			return err
		}

		release, err = client.CreateRelease(context.TODO(), projectID, applicationID, string(configBytes))
		if err != nil {
			return err
		}

		fmt.Println(release.ID)

		return nil
	},
}
