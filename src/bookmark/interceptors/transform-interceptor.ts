import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Response<Bookmark> {
  data: Bookmark;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    {
      return next.handle().pipe(
        map((data) => {
          data.title = 'Title 123';
          return data;
        }),
      );
    }
  }
}
