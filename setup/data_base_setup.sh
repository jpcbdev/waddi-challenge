sudo su - postgres
psql -c "alter user postgres with password 'development'"

sudo su - postgres
psql

CREATE DATABASE waddi;
GRANT CONNECT ON DATABASE waddi TO postgres;

## Create admin query
# INSERT INTO public."User" (name, username, password, permissions, role, created_at, updated_at) VAlUES ('admin', 'admin', 'admin', '{"read_write", "update"}', 'admin', '2023-02-16 10:31:00.576-06', '2023-02-16 10:31:00.576-06');

# Purge waddi DB and sessions query
# UPDATE pg_database SET datallowconn = 'false' WHERE datname = 'waddi'; SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'waddi';