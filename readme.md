# Monorepo for ETDStats

This is the monorepo for ETDStats service. ETDStats service is a monitor service
for EtherData Blockchain. It contains multiple microservices and multiple frontend apps. 
The overall architecture 

![arch](./images/arch.png)


## Setup

1. Install required dependencies: `pnpm install`
2. Build: `pnpm build`.
3. Start development server: `pnpm dev`


## Shared folder

Since we are using monorepo structure for our project, we will share a lot of files across multiple 
packages and services. To solve this problem, we set up a `scripts/post_install.ts` scripts to copy
these shared files to multiple packages and services. So put anything that can be shared to the `shared` folder,
and then modify the `scripts/post_install.ts` if you have something that can be shared.
