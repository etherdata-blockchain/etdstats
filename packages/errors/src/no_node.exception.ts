import { HttpException, HttpStatus } from "@nestjs/common";

export class NoNodeException extends HttpException {
  constructor() {
    super(
      "No node is connected to the given stats service",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
