import 'jest-preset-angular';
import { TestBed, TestBedStatic } from '@angular/core/testing';

import { XmessService } from './services/xmess.service';
import { XmessModule } from './xmess.module';

const xmessId = 'id';

describe('[XmessModule]', () => {
  describe('static forRoot(id: string, options: IXmessOptions): ModuleWithProviders', () => {
    let testBed: TestBedStatic;

    beforeEach(() => {
      testBed = TestBed.configureTestingModule({
        imports: [
          XmessModule.forRoot({ id: xmessId }),
        ],
      });
    });

    it('should provide XmessService', () => {
      const xmessService = testBed.get(XmessService);
      expect(xmessService).toBeInstanceOf(XmessService);
      expect(xmessService.id).toEqual(xmessId);
    });
  });
});
