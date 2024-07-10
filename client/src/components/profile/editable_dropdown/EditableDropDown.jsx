import PropTypes from "prop-types";
import styles from "../editable_field/EditableField.module.css";

function EditableDropDown({ label, value, isEditMode, valueName, onChange, options }) {  
    return (
      <div className={styles.field}>
        <label>{label}</label>
        <select
          name={value}
          onChange={(e) => onChange(e, valueName)}
          className={`${styles.input} ${isEditMode === false ? styles.readOnlyInput : ""}`}
          disabled={isEditMode === false}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

EditableDropDown.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  valueName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
};

export default EditableDropDown;
