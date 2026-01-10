import { Container } from '@/components/layout/Container'
import { Navbar } from '@/components/layout/Navbar'
import DecryptedText from '@/components/ui/DecryptedText'
import FaultyTerminal from './components/ui/FaultyTerminal' 

function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-green-500/30">
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>

      <div className="relative w-full h-screen">
        
        <div className="fixed inset-0 z-0 w-full h-full">
          <FaultyTerminal
            scale={2.9}
            digitSize={1.2}
            timeScale={0.5}
            noiseAmp={1.0}
            brightness={0.3}
            scanlineIntensity={0.5}
            curvature={0.3}
            mouseStrength={0.5}
            mouseReact={true}
            tint="#f4f8f4ff"
            pageLoadAnimation={false}
            gridMul={[2, 1]}
            pause={false}
            glitchAmount={1}
            flickerAmount={1}
          />
        </div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
            
            <DecryptedText 
              href="/"
              text="PSYCHOSOUND"
              speed={60}
              maxIterations={20}
              animateOn="hover"
              revealDirection="start"
              className="text-xl md:text-6xl font-medium tracking-tight hover:text-green-200 transition-colors"
              encryptedClassName="text-xl md:text-6xl font-medium tracking-tight text-green-200 transition-colors" 
            />
        </div>
      </div>

      <div className="relative z-20 bg-black border-t border-white/10">
        <Container className="py-24">
            
            <div className="flex flex-col gap-12 min-h-[50vh]">
              <h2 className="text-3xl font-bold mb-4">Tady budou obrázky :)</h2>
              
              <div className="text-xl text-green-400 font-mono">
                <DecryptedText 
                  text="this connection is encrypted"
                  animateOn="hover"
                  speed={50}
                  sequential={true}
                  className="text-xl text-green-400 font-mono"
                />
              </div>
            </div>

        </Container>
      </div>

    </div>
  )
}

export default App