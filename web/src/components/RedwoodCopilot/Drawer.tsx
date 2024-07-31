import { useState } from 'react'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import avatar from './avatars/rw-copilot-avatar.png'
import RedwoodCopilot from './RedwoodCopilot'

type props = {
  open: boolean
}

const RedwoodCopilotDrawer = (props?: props) => {
  const [open, setOpen] = useState(props?.open || false)

  if (!open)
    return (
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setOpen(true)}
          className="overflow-hidden rounded-full bg-green-200 p-1 shadow-lg transition-shadow duration-300 hover:scale-105  hover:shadow-xl hover:ring-2 hover:ring-green-300"
        >
          <img src={avatar} alt="Redwood Copilot" className="h-16 w-16 p-2" />
        </button>
      </div>
    )

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-[50vw] transform transition duration-1000 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="flex items-center text-base font-semibold leading-6 text-gray-900">
                      <img
                        src={avatar}
                        alt="Redwood Copilot"
                        aria-hidden="true"
                        className="mr-2 h-10 w-10 rounded-full bg-green-100 p-1 ring-2 ring-green-300"
                      />
                      <span className="text-green-600">Redwood Copilot</span>
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <RedwoodCopilot />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
export default RedwoodCopilotDrawer
