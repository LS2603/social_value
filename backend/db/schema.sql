DROP TABLE IF EXISTS la_domain_ranks CASCADE;
DROP TABLE IF EXISTS la_domain_ranks_raw CASCADE;
DROP TABLE IF EXISTS domains CASCADE;
DROP TABLE IF EXISTS local_authorities CASCADE;

CREATE TABLE local_authorities (
  id SERIAL PRIMARY KEY,
  la_district_code TEXT NOT NULL UNIQUE,
  la_district_name TEXT NOT NULL,
  imd_average_rank INT
);

CREATE TABLE domains (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE la_domain_ranks_raw (
  la_district_code TEXT,
  la_district_name TEXT,
  domain TEXT,
  rank INT
);

CREATE TABLE la_domain_ranks (
  id SERIAL PRIMARY KEY,
  la_id INT NOT NULL REFERENCES local_authorities(id) ON DELETE CASCADE,
  domain_id INT NOT NULL REFERENCES domains(id) ON DELETE CASCADE,
  rank INT,
  CONSTRAINT la_domain_ranks_unique UNIQUE (la_id, domain_id)
);

CREATE INDEX idx_la_domain_ranks_la_id ON la_domain_ranks(la_id);
CREATE INDEX idx_la_domain_ranks_domain_id ON la_domain_ranks(domain_id);
