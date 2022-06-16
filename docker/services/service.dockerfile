FROM swift:5.6-focal as build

ARG APP_NAME

# Install OS updates and, if needed, sqlite3
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true \
    && apt-get -q update \
    && apt-get -q dist-upgrade -y \
    && rm -rf /var/lib/apt/lists/*


WORKDIR /app/
COPY services/${APP_NAME} /app/services/${APP_NAME}
COPY packages /app/packages

WORKDIR /app/services/${APP_NAME}
RUN swift build -c release --static-swift-stdlib
WORKDIR /build
RUN cp "$(swift build --package-path /app/services/${APP_NAME} -c release --show-bin-path)/Run" ./

FROM ubuntu:latest

ARG APP_NAME
WORKDIR /app

RUN apt update
RUN apt install -y libcurl4

COPY --from=build /build/Run /app

EXPOSE 8080
ENTRYPOINT [ "./Run" ]
CMD ["serve", "--env", "production", "--hostname", "0.0.0.0", "--port", "8080"]