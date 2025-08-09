import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function ResponsiveTest() {
  return (
    <div className={`${inter.className} min-h-screen bg-gray-50 p-4`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Responsive Design Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Mobile First</h2>
            <p className="text-gray-600">This layout starts with mobile design and scales up for larger screens.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Tablet View</h2>
            <p className="text-gray-600">On medium screens, content appears in 2 columns.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Desktop View</h2>
            <p className="text-gray-600">On large screens, content appears in 3 columns.</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Width Test</h2>
          <div className="w-full bg-blue-100 p-4 rounded mb-4">
            <span className="text-sm text-blue-800">This should span 100% width on all devices</span>
          </div>
          
          <div className="overflow-x-auto">
            <div className="min-w-96 bg-red-100 p-4 rounded">
              <span className="text-sm text-red-800">This has a minimum width and should scroll horizontally if needed</span>
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500">
          <p>Screen size: <span id="screen-size" className="font-mono"></span></p>
          <p>Viewport: <span id="viewport" className="font-mono"></span></p>
        </div>
      </div>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          function updateSizes() {
            document.getElementById('screen-size').textContent = screen.width + ' x ' + screen.height;
            document.getElementById('viewport').textContent = window.innerWidth + ' x ' + window.innerHeight;
          }
          updateSizes();
          window.addEventListener('resize', updateSizes);
        `
      }} />
    </div>
  )
}
