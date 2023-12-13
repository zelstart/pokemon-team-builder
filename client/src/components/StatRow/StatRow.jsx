 // creates a row for each stat
 function renderStatRow(statName, baseStat, handleIVChange, handleEVChange, iv, ev, key) {
    const totalStat = calculateTotalStats(statName.toLowerCase(), baseStats, editIVs, editEVs, pokemonLevel, nature, natures);
    const width = totalStat / (statName === 'HP' ? MAX_HP_STAT_VALUE : MAX_OTHER_STAT_VALUE) * 100;
    const color = calculateColor(statName.toLowerCase(), baseStats, ivStats, evStats, pokemonLevel, nature, natures, MAX_HP_STAT_VALUE, MAX_OTHER_STAT_VALUE);

    return (
        <Row className='stat-table' key={key}>
            <div className='d-flex'>
                <Col lg={1} className='rc-400-bold stat-margin'>{statName}</Col>
                <Col lg={1} className='rc-400 stat-margin'>{baseStat}</Col>
                <Col lg={1} className='rc-400 stat-margin'>
                    {isEditMode ?
                        <input className='sm-input' type="number" value={iv} onChange={(e) => handleIVChange(statName, e.target.value)} /> :
                        iv
                    }
                </Col>
                <Col lg={1} className='rc-400 stat-margin'>
                    {isEditMode ?
                        <input className='sm-input' type="number" value={ev} onChange={(e) => handleEVChange(statName, e.target.value)} /> :
                        ev
                    }
                </Col>
                <Col lg={1} className='rc-400 stat-margin'>{totalStat}</Col>
                <Col lg={5} className='rc-400 stat-margin d-flex align-items-center'>
                    <div className='stat-bar' style={{ width: `${width}%`, backgroundColor: color }}></div>
                </Col>
            </div>
        </Row>
    );
}


{/* CARD MIDDLE // STATS */}
                    {/* Looks better on large screens now. Just gotta make it work with smaller screens.*/}
                    <Row className='stat-table'>
                        <div className='d-flex'>
                            <Col lg={1} className='rc-400-bold stat-margin'>Stat</Col>
                            <Col lg={1} className='rc-400-bold stat-margin'>Base</Col>
                            <Col lg={1} className='rc-400-bold stat-margin'>IV</Col>
                            <Col lg={1} className='rc-400-bold stat-margin'>EV</Col>
                            <Col lg={5} className='rc-400-bold stat-margin'>Total</Col>
                        </div>
                    </Row>
                    {statsArray.map((stat, index) => {
                        const { name: statName, base: baseStat } = stat;
                        const iv = editIVs[statName];
                        const ev = editEVs[statName];

                        return renderStatRow(statName, baseStat, handleIVChange, handleEVChange, iv, ev, index);
                    })}

                    {isEditMode ? (
                        <select className='rc-400 pokemon-input' value={editNature} onChange={e => setEditNature(e.target.value)}>
                            {Object.keys(natures).map(nature => {
                                const { increase, decrease } = natures[nature];
                                const label = increase && decrease ? `${nature} (+${increase.toUpperCase()}, -${decrease.toUpperCase()})` : nature;
                                return <option key={nature} value={nature}>{label}</option>
                            })}
                        </select>
                    ) : (
                        <></>
                    )}

                </Row>
            ) : (