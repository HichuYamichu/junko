package models

type Tag struct {
	TagID   string `gorm:"column:tagID"`
	GuildID string `gorm:"column:guildID"`
	Author  string
	Name    string
	Content string
}
