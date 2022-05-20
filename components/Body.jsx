import React, { useState } from 'react'
import { Search } from '.'

const Body = () => {
  const [search, setSearch] = useState('');

  return (
    <section className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <Search search={search} setSearch={setSearch} />
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-scroll scrollbar-hide h-96 p-4 gap-x-4 gap-y-8">

      </div>
    </section>
  )
}
export default Body
