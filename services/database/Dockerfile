FROM postgres:10-alpine

USER postgres

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB web_app_database

# Uncomment to add initial SQL script
# COPY init.sql /docker-entrypoint-initdb.d/

# Uncomment to add custom postgresql conf
# COPY pg_hba.conf /var/lib/postgresql/data/
# COPY postgresql.conf /var/lib/postgresql/data/

# TODO: add pgadmin?
