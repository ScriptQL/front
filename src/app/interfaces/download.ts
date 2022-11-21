import {HttpEventType} from "@angular/common/http";

export interface Download {

  type: HttpEventType,
  name: string,
  content: Blob

}
