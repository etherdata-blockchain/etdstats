FROM node:16-alpine as builder

ENV NODE_OPTIONS="--max_old_space_size=4096"
ARG APP_NAME

RUN apk add --no-cache python3 py3-pip git
RUN apk update && apk add make g++ && rm -rf /var/cache/apk/*
RUN apk add --no-cache curl \
    && curl -sL https://unpkg.com/@pnpm/self-installer | node

WORKDIR /app/
COPY .. .
RUN pnpm install
RUN pnpm build --filter=$APP_NAME

FROM node:16-alpine

ARG APP_NAME

WORKDIR /app/

# copy from build image
COPY --from=builder /app/services/$APP_NAME/dist ./

CMD ["node", "index.js"]
