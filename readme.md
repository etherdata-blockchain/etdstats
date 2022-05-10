# Monorepo for ETDStats

This is the monorepo for ETDStats service. ETDStats service is a monitor service
for EtherData Blockchain. It contains multiple microservices and multiple frontend apps. 
The overall architecture 

![arch](./images/arch.png)


## Setup

1. Install required dependencies: `pnpm install`
2. Build: `pnpm build`. This will also copy grpc files to `services/*` folder
3. Start development server: `pnpm dev`
