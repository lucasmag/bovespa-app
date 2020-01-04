CREATE TABLE IF NOT EXISTS "company" (
    id serial PRIMARY KEY,
    position int NOT NULL,
    company_name character varying(50) NOT NULL,
    symbol character varying(20) NOT NULL UNIQUE,
    region character varying(50) NOT NULL,
    global_position character varying(5) NOT NULL
);

CREATE TABLE IF NOT EXISTS "company_stock" (
    symbol character varying(20) NOT NULL UNIQUE,
    open NUMERIC(16, 4) NOT NULL,
    high NUMERIC(16, 4) NOT NULL,
    low NUMERIC(16, 4) NOT NULL,
    price NUMERIC(16, 4) NOT NULL,
    change NUMERIC(16, 4) NOT NULL,
    change_percent NUMERIC(7, 4) NOT NULL,
    previous_close NUMERIC(16, 4) NOT NULL,
    latest_trading_day TIMESTAMP NOT NULL,
    CONSTRAINT company_stock_fk FOREIGN KEY(symbol) REFERENCES company(symbol) ON DELETE CASCADE
);
