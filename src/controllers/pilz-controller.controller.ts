import {get} from '@loopback/rest';

export class HelloController {
  @get('/mypilz')
  hello(): string {
    return 'Hello world!';
  }
}
