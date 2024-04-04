function Converstaion() {
  return (
    <>
      <div className="flex gap-2 items-center p-2 py-1 hover:bg-sky-500 cursor-pointer">
        <div className="avatar online ">
          <div className="w-12 rounded-full">
            <img src="" alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">Muhammed</p>
            <span className="text-xl ">🥷</span>
          </div>
        </div>
      </div>

      <div className="divider py-0 my-0 h-1" />
    </>
  );
}

export default Converstaion;