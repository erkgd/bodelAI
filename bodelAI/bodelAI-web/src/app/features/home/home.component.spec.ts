import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  // Configura el entorno de pruebas antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent] // Importa el componente HomeComponent
    })
    .compileComponents(); // Compila los componentes

    // Crea una instancia del componente y su fixture
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta cambios iniciales en el componente
  });

  // Prueba que verifica si el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente sea verdadera
  });
});