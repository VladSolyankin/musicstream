
const TracksPagination = ({onPageChange}) => {
	return (
		<ul className="flex justify-between items-center gap-10 text-white">
			{
				Array.from({length: 9}, (_v, index) => (
					<li key={index}
						className="flex items-center justify-center w-24 h-20 border-white border-2 p-4 px-5 font-bold text-2xl hover:bg-gray-600 rounded-[50%] cursor-pointer"
						onClick={() => onPageChange(index)}
					>
						{index + 1}
					</li>
				))
			}
		</ul>
	);
};

export default TracksPagination;