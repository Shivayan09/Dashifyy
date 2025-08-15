import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDown, Check } from 'lucide-react'

const resources = [
  { key: 'yt', label: 'Saved videos' },
  { key: 'docs', label: 'Saved documents' },
  { key: 'notes', label: 'Notes' }
]

export default function ResourceDropdown({ selectedResource, setSelectedResource }) {
  return (
    <div className="max-w-xs">
      <Listbox value={selectedResource} onChange={setSelectedResource}>
        <div className="relative w-70">
          <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-purple-50 border border-purple-500 py-2 pl-3 pr-10 text-left text-purple-900 text-[1.04rem] shadow-sm focus:outline-none">
            <span className="block truncate text-center">
              {resources.find(r => r.key === selectedResource)?.label}
            </span>
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
              {resources.map((resource) => (
                <Listbox.Option
                  key={resource.key}
                  value={resource.key}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 text-[1.04rem] ${
                      active ? 'bg-purple-100 text-purple-900' : 'text-purple-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate text-center ${selected ? 'font-medium' : 'font-normal'}`}>
                        {resource.label}
                      </span>
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
