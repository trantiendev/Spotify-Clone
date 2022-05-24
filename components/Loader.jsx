import RingLoader from 'react-spinners/RingLoader';

function Loader() {
  return (
    <div className="h-screen bg-black">
      <div className="pt-40 flex flex-col items-center space-y-4">
        <span className="relative w-[400px] h-[250px] lg:w-[550px] lg:h-[240px]">
          <img
            src="https://rb.gy/y9mwtb"
            layout="fill"
            className="object-contain animate-pulse"
            alt="loading"
          />
        </span>
        <RingLoader size={23} color="#15883e" />
      </div>
    </div>
  );
}

export default Loader;
