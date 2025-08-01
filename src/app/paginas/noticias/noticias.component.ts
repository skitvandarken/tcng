import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { MenuComponent } from '../../layout/menu/menu.component';
import { RodapeComponent } from '../../layout/rodape/rodape.component';
import { NoticiasListarComponent } from '../../layout/noticias-listar/noticias-listar.component';


@Component({
  selector: 'app-noticias',
  imports: [TranslatePipe, MenuComponent, RodapeComponent, NoticiasListarComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent {

  
          useLanguage(language: string): void {
            this.translate.use(language);
        }
        
        constructor(private translate: TranslateService) {}

}
