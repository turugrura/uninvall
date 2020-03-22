import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common'

export class ParseIntPipe implements PipeTransform<any> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10)
    if (isNaN(val)) {
      throw new BadRequestException('Validateion failed, is not a number')
    }

    return val
  }
}
