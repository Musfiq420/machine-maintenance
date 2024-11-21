import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import MainContent from '../MainContent/MainContent';
import Footer from '../Footer/Footer';

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <MainContent />
      </div>
      <Footer />
    </div>
  );
};

export default Home;




// import React from 'react';

// const Home = () => {
//     return (
//         <div className="flex h-screen">
//             {/* Sidebar */}
//             <aside className="w-64 h-screen bg-green-50 text-gray-700">
//                 {/* Logo Section */}
//                 <div className="flex items-center px-6 py-4">
//                     <div className="w-8 h-8 bg-green-500 flex items-center justify-center rounded">
//                         {/* Simulating the logo */}
//                         <div className="text-white font-bold text-lg">F</div>
//                     </div>
//                     <h1 className="text-green-600 font-bold text-xl ml-3">Fastracker</h1>
//                 </div>

//                 {/* Navigation Menu */}
//                 <nav className="px-4">
//                     <ul>
//                         {/* Dashboard Link */}
//                         <li className="mb-4">
//                             <a href="#" className="block text-sm font-medium hover:text-green-600">
//                                 Dashboard
//                             </a>
//                         </li>

//                         {/* Sewing Menu */}
//                         <li className="mb-4">
//                             <p className="text-sm font-medium text-gray-500">Sewing</p>
//                             <ul className="ml-4 text-gray-500">
//                                 <li className="my-2">
//                                     <a href="#" className="block hover:text-green-600">Production</a>
//                                 </li>
//                                 <li className="my-2">
//                                     <a href="#" className="block hover:text-green-600">Trend Analysis</a>
//                                 </li>
//                                 <li className="my-2">
//                                     <a href="#" className="block hover:text-green-600">Realtime</a>
//                                 </li>
//                                 <li className="my-2">
//                                     <a href="#" className="block hover:text-green-600">Capacity Analysis</a>
//                                 </li>
//                             </ul>
//                         </li>

//                         {/* Machine Menu */}
//                         <li className="mb-4">
//                             <p className="text-sm font-medium text-gray-500">Machine</p>
//                             <ul className="ml-4">
//                                 <li className="my-2">
//                                     <a
//                                         href="#"
//                                         className="block text-green-600 font-bold bg-green-100 px-2 py-1 rounded hover:text-green-700"
//                                     >
//                                         Machine Monitoring
//                                     </a>
//                                 </li>
//                             </ul>
//                         </li>

//                         {/* Planning Menu */}
//                         <li>
//                             <p className="text-sm font-medium text-gray-500">Planning</p>
//                             <ul className="ml-4 text-gray-500">
//                                 <li className="my-2">
//                                     <a href="#" className="block hover:text-green-600">Scheduling</a>
//                                 </li>
//                                 <li className="my-2">
//                                     <a href="#" className="block hover:text-green-600">Kanban Board</a>
//                                 </li>
//                             </ul>
//                         </li>
//                     </ul>
//                 </nav>
//             </aside>

//             {/* Main Content */}
//             <main className="flex-1 p-8 bg-gray-50">
//                 {/* Header */}
//                 <header className="flex justify-between items-center mb-8">
//                     <h1 className="text-2xl font-bold">Machine Monitoring</h1>
//                     <div className="flex items-center space-x-4">
//                         <button className="text-sm font-medium text-gray-500">Admin Panel</button>
//                         <div className="text-sm text-gray-600">
//                             Md. Musfiqur Rahman
//                             <br />
//                             <span className="text-gray-400">Executive, IE and Workstudy</span>
//                         </div>
//                     </div>
//                 </header>

//                 {/* Filters and Stats */}
//                 <div className="grid grid-cols-5 gap-4 mb-8">
//                     <div className="bg-white shadow p-4 rounded">
//                         <h2 className="text-sm text-gray-500">Total Lost Time</h2>
//                         <p className="text-xl font-bold">2:13 hrs</p>
//                         <span className="text-green-500 text-sm">+5.9%</span>
//                     </div>
//                     <div className="bg-white shadow p-4 rounded">
//                         <h2 className="text-sm text-gray-500">Total Machines</h2>
//                         <p className="text-xl font-bold">431</p>
//                         <span className="text-green-500 text-sm">+5.9%</span>
//                     </div>
//                     <div className="bg-white shadow p-4 rounded">
//                         <h2 className="text-sm text-gray-500">Active</h2>
//                         <p className="text-xl font-bold">420</p>
//                         <span className="text-green-500 text-sm">+5.9%</span>
//                     </div>
//                     <div className="bg-white shadow p-4 rounded">
//                         <h2 className="text-sm text-gray-500">Repairing</h2>
//                         <p className="text-xl font-bold">12</p>
//                         <span className="text-green-500 text-sm">+5.9%</span>
//                     </div>
//                     <div className="bg-white shadow p-4 rounded">
//                         <h2 className="text-sm text-gray-500">Idle</h2>
//                         <p className="text-xl font-bold">11</p>
//                         <span className="text-green-500 text-sm">+5.9%</span>
//                     </div>
//                 </div>

//                 {/* Machine Status */}
//                 <section>
//                     <h2 className="text-lg font-bold mb-4">Block A</h2>
//                     <div className="grid grid-cols-5 gap-4">
//                         {/* Example Machine Cards */}
//                         <div className="bg-green-100 shadow p-4 rounded">
//                             <p className="text-sm text-green-600 font-bold">Machine #45</p>
//                             <p className="text-gray-500">SN</p>
//                             <p className="text-xs text-gray-400">Back Join</p>
//                         </div>
//                         <div className="bg-red-100 shadow p-4 rounded">
//                             <p className="text-sm text-red-600 font-bold">Machine #57</p>
//                             <p className="text-gray-500">DN</p>
//                             <p className="text-xs text-gray-400">Collar Join</p>
//                         </div>
//                         <div className="bg-yellow-100 shadow p-4 rounded">
//                             <p className="text-sm text-yellow-600 font-bold">Machine #12</p>
//                             <p className="text-gray-500">FOA</p>
//                             <p className="text-xs text-gray-400">Side Seam</p>
//                         </div>
//                     </div>
//                 </section>
//             </main>
//         </div>
//     );
// };

// export default Home;