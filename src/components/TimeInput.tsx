import {useEffect, useState} from 'react'

interface Props {
  onChange(value: string | null): void
  value: string | null
  allowEmpty?: boolean
}

function validate(value: string, allowEmpty?: boolean) {
  if (allowEmpty && value === '') return true
  return value.match(/^[0-9]{6}$/)
}

export const TimeInput: React.FC<Props> = ({onChange, value: initialValue, allowEmpty}) => {
  const [value, setValue] = useState<string>(initialValue ?? '')

  useEffect(() => {
    if (initialValue) setValue(initialValue)
  }, [initialValue])

  const isValid = validate(value, allowEmpty)

  return (
    <input
      value={value}
      type="text"
      className={!isValid ? 'border-red-500 bg-red-100' : ''}
      onChange={(e) => {
        const newValue = e.target.value
        setValue(newValue)
        if (validate(newValue, allowEmpty)) onChange(newValue || null)
        else onChange(null)
      }}
    />
  )
}
