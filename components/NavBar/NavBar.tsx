import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";

function NavBar() {
  const [isOPenModal, setIsOpenModal] = useState(false);
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { address, connector, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <div className="p-2 bg-[#2D3343]">
      <div className="flex justify-between px-3">
        <div></div>
        <div>
          {isConnected ? (
            <div className="flex gap-2 justify-center">
              <div className="p-2 text-white rounded-md bg-[#575C69] hover:bg-[#1979B9] duration-300">
                {address}
              </div>
              <button
                onClick={() => disconnect()}
                className="p-2 text-white rounded-md bg-[#575C69] hover:bg-[#1979B9] duration-300"
              >
                Disconnect Wallet
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsOpenModal(!isOPenModal)}
              className="p-2 text-white rounded-md bg-[#575C69] hover:bg-[#1979B9] duration-300"
            >
              Connect Wallet
            </button>
          )}

          <Transition appear show={isOPenModal} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setIsOpenModal(!isOPenModal)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-2 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#282E3C] p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-white"
                      >
                        Choose Wallet
                      </Dialog.Title>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        <div
                          className="flex flex-col gap-2 items-center justify-center border-2 border-[#444B59] text-white rounded-md px-8 cursor-pointer hover:shadow-lg transition duration-300 ease-in-out"
                          onClick={() => {
                            connect({ connector: connectors[0] });
                            setIsOpenModal(!isOPenModal);
                          }}
                        >
                          <Image
                            src={"/metamaks_logo.png"}
                            alt="metamask_logo"
                            height={100}
                            width={100}
                          />
                          <span>Metamask</span>
                        </div>
                        <div
                          className="flex flex-col gap-2 items-center justify-center border-2 border-[#444B59] text-white rounded-md px-8"
                          onClick={() => {
                            connect({ connector: connectors[2] });
                            setIsOpenModal(!isOPenModal);
                          }}
                        >
                          <Image
                            src={"/coinbase.png"}
                            alt="coinbase_logo"
                            height={100}
                            width={100}
                          />
                          <span>Coinbase</span>
                        </div>
                        <div
                          className="flex flex-col gap-2 items-center justify-center border-2 border-[#444B59] text-white rounded-md px-8"
                          onClick={() => {
                            connect({ connector: connectors[1] });
                            setIsOpenModal(!isOPenModal);
                          }}
                        >
                          <Image
                            src={"/wallet_connect.png"}
                            alt="wallet_connect"
                            height={100}
                            width={100}
                          />
                          <span>{connectors[0].name}</span>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
