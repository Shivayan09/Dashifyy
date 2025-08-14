import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDown, Check } from 'lucide-react'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function DayDropdown({ selectedDay, setSelectedDay }) {
  return (
    <div className="max-w-xs">
      <Listbox value={selectedDay} onChange={setSelectedDay}>
        <div className="relative w-82 md:w-40 -ml-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-gray-100 border border-purple-500 py-2 md:py-1.5 text-center md:text-left md:pl-5 text-purple-900 text-[1.04rem] shadow-sm focus:outline-none">
            <span className="block truncate">{selectedDay}</span>
            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <ChevronDown className="h-5 w-5 text-purple-700" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-30 mt-1 max-h-72 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-purple-400 focus:outline-none sm:text-sm">
              {days.map((day) => (
                <Listbox.Option
                  key={day}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 text-[1.04rem] ${
                      active ? 'bg-purple-100 text-purple-900' : 'text-purple-900'
                    }`
                  }
                  value={day}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {day}
                      </span>
                      {selected ? (
                        <span className="absolute left-2 inset-y-0 flex items-center text-purple-600">
                          <Check className="h-4 w-4" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
