// import React from 'react';

// const Sidebar = () => {
//   return (
//     <aside className="bg-green-50 text-gray-700 w-64 h-full">
//       {/* Logo Section */}
//       <div className="flex items-center px-6 py-4">
//         <div className="w-8 h-8 bg-green-500 flex items-center justify-center rounded">
//           {/* Simulating the logo */}
//           <div className="text-white font-bold text-lg">F</div>
//         </div>
//         <h1 className="text-green-600 font-bold text-xl ml-3">Fastracker</h1>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="px-4">
//         <ul>
//           {/* Dashboard Link */}
//           <li className="mb-4">
//             <a href="#" className="block text-sm font-medium hover:text-green-600">
//               Dashboard
//             </a>
//           </li>

//           {/* Sewing Menu */}
//           <li className="mb-4">
//             <p className="text-sm font-medium text-gray-500">Sewing</p>
//             <ul className="ml-4 text-gray-500">
//               <li className="my-2">
//                 <a href="#" className="block hover:text-green-600">Production</a>
//               </li>
//               <li className="my-2">
//                 <a href="#" className="block hover:text-green-600">Trend Analysis</a>
//               </li>
//               <li className="my-2">
//                 <a href="#" className="block hover:text-green-600">Realtime</a>
//               </li>
//               <li className="my-2">
//                 <a href="#" className="block hover:text-green-600">Capacity Analysis</a>
//               </li>
//             </ul>
//           </li>

//           {/* Machine Menu */}
//           <li className="mb-4">
//             <p className="text-sm font-medium text-gray-500">Machine</p>
//             <ul className="ml-4">
//               <li className="my-2">
//                 <a
//                   href="#"
//                   className="block text-green-600 font-bold bg-green-100 px-2 py-1 rounded hover:text-green-700"
//                 >
//                   Machine Monitoring
//                 </a>
//               </li>
//             </ul>
//           </li>

//           {/* Planning Menu */}
//           <li>
//             <p className="text-sm font-medium text-gray-500">Planning</p>
//             <ul className="ml-4 text-gray-500">
//               <li className="my-2">
//                 <a href="#" className="block hover:text-green-600">Scheduling</a>
//               </li>
//               <li className="my-2">
//                 <a href="#" className="block hover:text-green-600">Kanban Board</a>
//               </li>
//             </ul>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;




//------------------------

import React, { useState } from 'react';

const Sidebar = () => {
  const [isSewingOpen, setSewingOpen] = useState(false);
  const [isMachineOpen, setMachineOpen] = useState(false);
  const [isPlanningOpen, setPlanningOpen] = useState(false);

  return (
    <div className="bg-green-50 text-gray-700 w-64 h-full">
      {/* <div className="flex items-center justify-center py-4">
         <img
          src="https://via.placeholder.com/32"
          alt="Logo"
          className="h-8 w-8"
        />
        <div className="text-white font-bold text-lg">F</div>
        <h1 className="ml-2 text-2xl font-bold text-green-700">Fastracker</h1>
      </div> */}
      <div className="flex items-center px-6 py-4">
        <div className="w-8 h-8 bg-green-500 flex items-center justify-center rounded">
          {/* Simulating the logo */}
          <div className="text-white font-bold text-lg">F</div>
        </div>
        <h1 className="text-green-600 font-bold text-xl ml-3">Fastracker</h1>
      </div>
      <ul className="mt-4 space-y-2">
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-green-100">
            Dashboard
          </a>
        </li>
        <li>
          <button
            onClick={() => setSewingOpen(!isSewingOpen)}
            className="flex justify-between w-full px-4 py-2 text-left hover:bg-green-100">
            Sewing
            <span>{isSewingOpen ? '-' : '+'}</span>
          </button>
          {isSewingOpen && (
            <ul className="ml-6 space-y-1">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-green-100">
                  Production
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-green-100">
                  Trend Analysis
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-green-100">
                  Realtime
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-green-100">
                  Capacity Analysis
                </a>
              </li>
            </ul>
          )}
        </li>
        <li>
          <button
            onClick={() => setMachineOpen(!isMachineOpen)}
            className="flex justify-between w-full px-4 py-2 text-left hover:bg-green-100">
            Machine
            <span>{isMachineOpen ? '-' : '+'}</span>
          </button>
          {isMachineOpen && (
            <ul className="ml-6 space-y-1">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-green-100">
                  Machine Monitoring
                </a>
              </li>
            </ul>
          )}
        </li>
        <li>
          <button
            onClick={() => setPlanningOpen(!isPlanningOpen)}
            className="flex justify-between w-full px-4 py-2 text-left hover:bg-green-100">
            Planning
            <span>{isPlanningOpen ? '-' : '+'}</span>
          </button>
          {isPlanningOpen && (
            <ul className="ml-6 space-y-1">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-green-100">
                  Scheduling
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-green-100">
                  Kanban Board
                </a>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
