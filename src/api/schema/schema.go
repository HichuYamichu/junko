package schema

import (
	"io/ioutil"
	"path"
	"strings"
)

func Load() (string, error) {
	root := "./schema"
	var sb strings.Builder

	files, err := ioutil.ReadDir(root)
	if err != nil {
		return "", err
	}
	for _, f := range files {
		a := f.Name()
		if valid := strings.HasSuffix(a, ".graphql"); !valid {
			continue
		}
		b, err := ioutil.ReadFile(path.Join(root, a))
		if err != nil {
			return "", err
		}
		sb.WriteString(string(b))
	}

	return sb.String(), nil
}
