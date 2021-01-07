export class Config {
    public ownerID = process.env.OWNER_ID!;
    public token = process.env.TOKEN!;
    public color = process.env.COLOR || '#f271cd';
    public defaultPrefix = process.env.PREFIX || '>';
    public defaultPreset = process.env.PRESET || 'junko';
    public postgresHost = process.env.POSTGRES_HOST;
    public postgresUsername = process.env.POSTGRES_USER;
    public postgresPassword = process.env.POSTGRES_PASSWORD;
    public postgresDatabase = process.env.POSTGRES_DB;
    public myriag_url = `${process.env.MYRIAG_HOST}:${process.env.MYRIAG_PORT}`
}
