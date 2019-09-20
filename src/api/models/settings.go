package models

import "github.com/lib/pq"

type Settings struct {
	GuildID    string `gorm:"column:guildID"`
	Prefix     string
	Preset     string
	LogChannel string         `gorm:"column:logChannel"`
	Blacklist  pq.StringArray `gorm:"type:varchar(255)[]"`
}
