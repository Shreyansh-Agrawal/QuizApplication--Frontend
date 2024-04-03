import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CustomStrategy } from '../../shared/constants/service.constants';

@Injectable({
  providedIn: 'root',
})
export class NetworkAwarePreloadService implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {

    const strategy = route.data?.['preload']

    if (strategy == CustomStrategy.fastInternetSpeed) {
      const connection = (navigator as any).connection;
      
      if (connection.saveData) {
        return of(null);
      }
      const speed = connection.effectiveType;
      const slowConnections = ['slow-2g', '2g', '3g'];
      if (slowConnections.includes(speed)) {
        return of(null);
      }   
      return load();
    }

    else {
      return route.data?.["preload"] === true ? load() : of(null);
    }
  }
}
