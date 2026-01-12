  import { BrowserRouter, Routes, Route } from 'react-router-dom'
  import { AuthProvider } from '@/context/AuthContext'
  import { Container } from '@/components/layout/Container'
  import { Navbar } from '@/components/layout/Navbar'
  import DecryptedText from '@/components/ui/DecryptedText'
  import FaultyTerminal from './components/ui/FaultyTerminal'
  import InfiniteEventSlider from '@/components/slider/InfiniteEventSlider'
  import { sampleEvents } from '@/data/sampleEvents'
  import GlassSurface from './components/ui/GlassSurface'
  import AdminLogin from '@/pages/AdminLogin'
  import AdminDashboard from '@/pages/AdminDashboard'

  function HomePage() {
    return (
      <div className="min-h-screen bg-black text-white selection:bg-green-500/30">
        <div className="fixed top-0 w-full z-50">
          <Navbar />
        </div>
        <div className="relative w-full h-screen sm:h-[100dvh] overflow-hidden">

          <div className="absolute inset-0 z-0 w-full h-full max-h-screen sm:max-h-[100dvh]">
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

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4">

            <GlassSurface
            width="auto"
            height="auto"
            borderRadius={100}
            borderWidth={20}
            backgroundOpacity={0.5}
            saturation={0.5}
            brightness={50}
            opacity={0.93}
            blur={11}
            displace={0.5}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            className="p-3 px-4 md:px-7"
            >
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-medium tracking-tight hover:text-green-200 transition-colors">PSYCHOSOUND</h1>

            </GlassSurface>

          </div>
        </div>

        <div className="relative z-20 bg-black border-t border-white/10">
          <div className="py-24 flex flex-col gap-12 min-h-[50vh]">
            <Container>
              <h2 className="text-4xl font-bold text-center mb-8">UPCOMING EVENTS</h2>
            </Container>

            <InfiniteEventSlider
              events={sampleEvents}
              speed={1}
            />

            <Container>

            <div className="flex flex-col items-center justify-center">
                <DecryptedText 
                              href="/"
                              text="testing decrypted text animation"
                              speed={50}
                              maxIterations={50}
                              animateOn="hover"
                              revealDirection="left"
                              className="text-xl md:text-6xl font-medium tracking-tight hover:text-green-200 transition-colors"
                              encryptedClassName="text-xl md:text-6xl font-medium tracking-tight text-green-200 transition-colors" 
                            />
            </div>
            
            </Container>
          </div>
        </div>

      </div>
    )
  }

  function App() {
    return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    )
  }

  export default App