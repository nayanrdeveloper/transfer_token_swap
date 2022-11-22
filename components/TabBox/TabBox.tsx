import Image from "next/image";
import React, { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

function TabBox() {
  const networks = [
    {
      name: "Cello",
      image: "/cello.png",
      networkId: 1,
    },
    {
      name: "Matic",
      image: "/matic_mumbai.png",
      networkId: 2,
    },
    {
      name: "Goerli",
      image: "/goerli.jpeg",
      networkId: 3,
    },
  ];
  const [selected, setSelected] = useState(networks[0]);

  return (
    <div className="bg-[#2D3343] mx-auto flex flex-col items-center w-96 mt-15 rounded-xl">
      <div className="p-6 flex flex-col items-center rounded-md">
        <ul className="flex gap-2">
          <li className="py-1 px-5 text-white hover:bg-[#575C69] duration-300 rounded-md cursor-pointer bg-[#282E3C]">
            Swap
          </li>
          <li className="py-1 px-5 text-white hover:bg-[#575C69] duration-300 rounded-md cursor-pointer bg-[#282E3C]">
            Pool
          </li>
        </ul>
        <div className="mt-8 flex flex-col gap-4">
          <div className="bg-[#282E3C] p-3 flex flex-col gap-4 rounded-lg">
          <label className="text-white">Network</label>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-[#3E4350] text-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <div className="block truncate flex gap-2">
                    <Image
                      src={selected.image}
                      alt={selected.name}
                      height={20}
                      width={20}
                      className="rounded-full"
                    />
                    <span>{selected.name}</span>
                  </div>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#3E4350] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {networks.map((network, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 bg-[#3E4350] pr-4 ${
                            active ? "bg-[#1979B9]" : "text-gray-900"
                          }`
                        }
                        value={network}
                      >
                        {({ selected }) => (
                          <>
                            <div
                              className={`block truncate flex gap-2 ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              <Image
                                src={network.image}
                                alt={network.name}
                                height={20}
                                width={20}
                                className="rounded-full"
                              />
                              <span className="text-white">{network.name}</span>
                            </div>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div className="bg-[#282E3C] p-3 flex flex-col gap-4 rounded-lg">
            <label className="text-white">To</label>
            <input
              type={"text"}
              className="rounded-md h-10 w-80 bg-[#3E4350] border-2 border-[#444B59] text-white p-2"
            />
          </div>
          <div className="bg-[#282E3C] p-3 flex flex-col gap-4 rounded-lg">
            <label className="text-white">Amount</label>
            <input
              type={"number"}
              className="rounded-md h-10 w-80 bg-[#3E4350] border-2 border-[#444B59] text-white p-2"
            />
          </div>
          <button className="px-4 py-3 bg-[#1979B9] rounded-md text-white">
            Transfer
          </button>
        </div>
      </div>
    </div>
  );
}

export default TabBox;
