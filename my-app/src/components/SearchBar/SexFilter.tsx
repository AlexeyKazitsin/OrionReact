import "./SexFilter.sass"

type SexFilterProps = {
  sexquery: string;
  setSexQuery: (value: string) => void;
}


const SexFilter = ({ sexquery, setSexQuery }:SexFilterProps) => {

    const handleChange = (value: string) => {
        setSexQuery(value)
    }
    
    return (
        <div className="filter-container">

      <label htmlFor="filter" className="filter-label">Пол:</label>
      <select className="filter-select" value={sexquery} onChange={(e) => handleChange(e.target.value)} >
        <option value="">Любой</option>
        <option value="Мужской">Мужской</option>
        <option value="Женский">Женский</option>
      </select>
    </div>
    )
}

export default SexFilter;