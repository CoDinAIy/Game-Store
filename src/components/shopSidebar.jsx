//shows filter options all/top(this month/this year/all time)/platform(ps4/pc/xbox etc)/genre(horror/racing/sports etc)
//when filter is clicked updates state in parent component which passes to shoppage
import '../styles/shopSidebar.css'

export function Filters({filterList, currentFilter, setCurrentFilter, setTitle}) {

    const updateFilter = (e, newFilter) => {
        setCurrentFilter(newFilter)
        setTitle(e.target.innerHTML)

        console.log(`current filter = ${currentFilter}`)
    }

    return (
        <>
            {filterList.map((filter) => (
                <div key={filter[0]} className={filter[0]} onClick={(e) => updateFilter(e, filter[0])}>
                    {filter[1]}
                </div>
            ))}
        </>
    )
}

export default function Sidebar({currentFilter, setCurrentFilter, setTitle}) {

    const topFilters = [
        ['all-time', 'All time'],
        ['this-year', 'This year']
    ]

    const platformFilters = [
        ['pc', 'PC'],
        ['playstation', 'Playstation'],
        ['xbox', 'Xbox One'],
        ['nintendo', 'Nintendo Switch'],
        ['ios', 'iOS'],
        ['android', 'Android']
    ]

    const genreFilters = [
        ['action','Action'],
        ['strategy','Strategy'],
        ['rpg','RPG'],
        ['shooter','Shooter'],
        ['adventure','Adventure'],
        ['puzzle','Puzzle'],
        ['racing','Racing'],
        ['sports','Sports']
    ]
    return (
        <div className="sidebar-container">
            <div className="content">
                <div className="top-games filter-container">
                    <div className="top-games-title">Top</div>
                    <div className="top-games">
                        <Filters filterList={topFilters} currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} setTitle={setTitle}/>
                    </div>
                </div>
                <div className="platforms filter-container">
                    <div className="platforms-title">Platforms</div>
                    <div className="platforms">
                        <Filters filterList={platformFilters} currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} setTitle={setTitle}/>
                    </div>
                </div>
                <div className="genres filter-container">
                    <div className="genres-title">Genres</div>
                    <div className="genres">
                        <Filters filterList={genreFilters} currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} setTitle={setTitle}/>
                    </div>
                </div>
            </div>
        </div>
    )
}