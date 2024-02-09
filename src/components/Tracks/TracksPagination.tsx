const TracksPagination = ({ onPageChange }) => {
	return (
		<div className="flex justify-center items-center gap-10 text-white">
			<ul className="flex gap-2 items">
				{
					Array.from({ length: 9 }, (_v, index) => (
						<li key={index}
							className="flex items-center justify-center w-20 h-20 border-white border-2 p-1 font-bold text-2xl hover:bg-gray-600 rounded-[50%] cursor-pointer"
							onClick={() => onPageChange(index)}
						>
							{index + 1}
						</li>
					))
				}
			</ul>
		</div>
	);
};

export default TracksPagination;
