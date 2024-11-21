// import React from 'react';

// const Header = () => {
//   return (
//     <header className="flex justify-between items-center mb-8">
//       <div className="flex items-center">
//         <h1 className="text-2xl font-bold">Machine Monitoring</h1>
//         <span className="ml-3 px-2 py-1 text-sm font-bold text-white bg-red-500 rounded">LIVE</span>
//       </div>
//       <div className="flex items-center space-x-4">
//         <button className="text-sm font-medium text-gray-500">Admin Panel</button>
//         <div className="text-sm text-gray-600">
//           Md. Musfiqur Rahman
//           <br />
//           <span className="text-gray-400">Executive, IE and Workstudy</span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;






import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white shadow">
      {/* Left Section: Title and LIVE badge */}
      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold text-gray-900">Machine Monitoring</h1>
        <span className="px-2 py-1 text-sm font-bold text-white bg-red-500 rounded">
          LIVE
        </span>
      </div>

      {/* Right Section: Admin Panel and Profile */}
      <div className="flex items-center space-x-6">
        <button className="text-gray-600 font-medium">Admin Panel</button>
        <div className="flex items-center space-x-2">
          {/* Email Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26c.26.17.57.26.89.26s.63-.09.89-.26L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {/* Profile Information */}
          <div className="text-sm">
            <p className="font-medium text-gray-800">Md. Musfiqur Rahman</p>
            <p className="text-gray-500">Executive, IE and Workstudy</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;























// import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

// const navigation = [
//   { name: 'Dashboard', href: '#', current: true },
//   { name: 'Team', href: '#', current: false },
//   { name: 'Projects', href: '#', current: false },
//   { name: 'Calendar', href: '#', current: false },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// export default function Header() {
//   return (
//     <Disclosure as="nav" className="bg-gray-800">
//       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//         {/* Top Header Section */}
//         <header className="flex justify-between items-center mb-4 py-4">
//           <div className="flex items-center">
//             <h1 className="text-2xl font-bold text-white">Machine Monitoring</h1>
//             <span className="ml-3 px-2 py-1 text-sm font-bold text-white bg-red-500 rounded">LIVE</span>
//           </div>
//           <div className="flex items-center space-x-4 text-white">
//             <button className="text-sm font-medium">Admin Panel</button>
//             <div className="text-sm">
//               Md. Musfiqur Rahman
//               <br />
//               <span className="text-gray-400">Executive, IE and Workstudy</span>
//             </div>
//           </div>
//         </header>

//         {/* Main Navigation Section */}
//         <div className="relative flex h-16 items-center justify-between">
//           {/* Mobile menu button */}
//           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//             <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//               <span className="absolute -inset-0.5" />
//               <span className="sr-only">Open main menu</span>
//               <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
//               <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
//             </DisclosureButton>
//           </div>

//           {/* Logo and Navigation */}
//           <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//             <div className="flex shrink-0 items-center">
//               <img
//                 alt="Your Company"
//                 src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
//                 className="h-8 w-auto"
//               />
//             </div>
//             <div className="hidden sm:ml-6 sm:block">
//               <div className="flex space-x-4">
//                 {navigation.map((item) => (
//                   <a
//                     key={item.name}
//                     href={item.href}
//                     aria-current={item.current ? 'page' : undefined}
//                     className={classNames(
//                       item.current
//                         ? 'bg-gray-900 text-white'
//                         : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                       'rounded-md px-3 py-2 text-sm font-medium',
//                     )}
//                   >
//                     {item.name}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Notifications and Profile */}
//           <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//             <button
//               type="button"
//               className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//             >
//               <span className="absolute -inset-1.5" />
//               <span className="sr-only">View notifications</span>
//               <BellIcon aria-hidden="true" className="size-6" />
//             </button>
//             {/* Profile dropdown */}
//             <Menu as="div" className="relative ml-3">
//               <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                 <span className="absolute -inset-1.5" />
//                 <span className="sr-only">Open user menu</span>
//                 <img
//                   alt=""
//                   src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                   className="size-8 rounded-full"
//                 />
//               </MenuButton>
//               <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
//                 <MenuItem>
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                     Your Profile
//                   </a>
//                 </MenuItem>
//                 <MenuItem>
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                     Settings
//                   </a>
//                 </MenuItem>
//                 <MenuItem>
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                     Sign out
//                   </a>
//                 </MenuItem>
//               </MenuItems>
//             </Menu>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       <DisclosurePanel className="sm:hidden">
//         <div className="space-y-1 px-2 pb-3 pt-2">
//           {navigation.map((item) => (
//             <DisclosureButton
//               key={item.name}
//               as="a"
//               href={item.href}
//               aria-current={item.current ? 'page' : undefined}
//               className={classNames(
//                 item.current
//                   ? 'bg-gray-900 text-white'
//                   : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                 'block rounded-md px-3 py-2 text-base font-medium',
//               )}
//             >
//               {item.name}
//             </DisclosureButton>
//           ))}
//         </div>
//       </DisclosurePanel>
//     </Disclosure>
//   );
// }
