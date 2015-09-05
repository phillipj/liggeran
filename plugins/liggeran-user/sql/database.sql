
CREATE TABLE profile (
  id text PRIMARY KEY,
  privateEmail text NOT NULL,
  companyEmail text NOT NULL,
  password  text,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
