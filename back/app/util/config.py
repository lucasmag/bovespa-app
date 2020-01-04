import configparser


config = configparser.ConfigParser()
config.read("config.ini")


def get_api_key():
    return config["api"]["KEY"]


def get_database_url():
    return config["database"]["URL"]
