import './app.css'
import 'text-security/text-security.css'
import voronoi from './modules/voronoibg'
import model from './modules/khybermodel'
import { MasterPasswordComponent } from './modules/MasterPasswordComponent'
import { KeywordComponent } from './modules/KeywordComponent'
import { GeneratedPasswordComponent } from './modules/GeneratedPasswordComponent'
import { ConfigComponent } from './modules/ConfigComponent'
import m from 'mithril'

let canvas;

window.addEventListener("load", (event) => {
  canvas = document.getElementById('voronoiCanvas');
  resizeCanvas();
  voronoi.setup('voronoiCanvas');
});

window.addEventListener("resize", (event) => {
  resizeCanvas();
})

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.style.width = canvas.width + 'px';

  canvas.height = window.innerHeight;
  canvas.style.height = canvas.height + 'px';
}


function OhBGenApp () {
  return {
    view: () => (
      <main class="relative">
        <canvas id="voronoiCanvas" class="absolute w-full" resize></canvas>
        <div class='flex h-screen items-center w-full absolute no-events'>
          <div class='w-full md:rounded-xl shadow-[0px_-1px_64px_8px_rgba(0,_0,_0,_0.4)] p-4 md:p-8 md:max-w-md md:mx-auto backdrop-blur bg-white/50 all-events'>
            <div class='space-y-4'>
              <KeywordComponent setter={model.setKeyword} saveFunction={model.save} />

              <ConfigComponent />

              <MasterPasswordComponent
                valid={model.isMasterPasswordValid()}
                validationHint={model.getValidationHint()}
                setter={model.setMasterPassword}
                value={model.getMasterPassword()}
              />

              <GeneratedPasswordComponent value={model.getGeneratedPassword()} reset={model.getPasswordExpiryTime()} />
            </div>
          </div>
        </div>
      </main>
    )
  }
}

m.mount(document.body, OhBGenApp)
