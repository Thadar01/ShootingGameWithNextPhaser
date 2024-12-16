import { useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import MainMenuScene from './game/scenes/MainMenuScene';

function App()
{
    // The sprite can only be moved in the MainMenu Scene

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);




  

    return (
        <div id="app">
            <PhaserGame ref={phaserRef}  />
          
        </div>
    )
}

export default App
