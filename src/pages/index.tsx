import mjml from "mjml"
import { computed, observable } from "mobx"
import { observer } from "mobx-react"
import { NextPage } from "next"
import React from "react"
import ReactMde from "react-mde"
import { copyToClipboard } from "../clipboard"
import { makeData, TemplateData } from "../makeJson"

const InputWithToggle: React.FunctionComponent<{
  label: string
  value: string | undefined
  onChange: (value: string | undefined) => void
}> = ({ label, value, onChange }) => {
  const showing = value != null
  const [oldValue, setOldValue] = React.useState("")

  const toggleShowing = React.useCallback(() => {
    if (showing) {
      setOldValue(value ?? "")
      onChange(undefined)
    } else {
      onChange(oldValue)
    }
  }, [showing])

  return (
    <>
      <style jsx>{`
        label {
          margin: 0.5em auto;
        }
      `}</style>
      <label>
        <input type="checkbox" checked={showing} onChange={toggleShowing} />
        {label}
      </label>

      {showing ? <ReactMde value={value} onChange={onChange} /> : null}
    </>
  )
}

const state = observable<TemplateData>({
  previewText: "",
  unsubscribeButton: false,
  introductionText: undefined,
  column1Text: undefined,
  column2Text: undefined,
  farewellText: undefined
})

const makeEmail = computed<string>(() => mjml(makeData(state)).html)

const IndexPage = observer<NextPage>(() => {
  return (
    <>
      <style jsx>{`
        :global(html) {
          height: 100%;
        }
        form,
        fieldset {
          display: flex;
          flex-flow: column nowrap;
        }
        .part-wrapper {
          display: flex;
          flex-flow: row nowrap;
        }
        .part {
          width: 50%;
          height: 100vh;
          display: flex;
        }
        iframe {
          flex-grow: 1;
          margin: 0;
          padding: 0;
        }
      `}</style>
      <div className="part-wrapper">
        <form className="part">
          <fieldset>
            <legend>Information about email</legend>
            <p>
              <label>
                Preview{" "}
                <input
                  type="text"
                  value={state.previewText}
                  onChange={React.useCallback(
                    evt => (state.previewText = evt.target.value),
                    []
                  )}
                />
              </label>
              <br />
              <span>
                (this is what the recipient will see in their list of emails and
                in the notification - without opening it yet)
              </span>
            </p>
            <p>
              <label>
                <input
                  type="checkbox"
                  checked={state.unsubscribeButton}
                  onChange={React.useCallback(
                    evt => (state.unsubscribeButton = evt.target.checked),
                    []
                  )}
                />
                Show <em>Unsubscribe</em> link
              </label>
            </p>
          </fieldset>
          <fieldset>
            <legend>Email text</legend>

            <InputWithToggle
              label="Introduction"
              value={state.introductionText}
              onChange={React.useCallback(
                v => (state.introductionText = v),

                []
              )}
            />
            <InputWithToggle
              label="Column 1"
              value={state.column1Text}
              onChange={React.useCallback(v => (state.column1Text = v), [])}
            />
            <InputWithToggle
              label="Column 2"
              value={state.column2Text}
              onChange={React.useCallback(v => (state.column2Text = v), [])}
            />
            <InputWithToggle
              label="Farewell"
              value={state.farewellText}
              onChange={React.useCallback(v => (state.farewellText = v), [])}
            />
          </fieldset>
          <button
            onClick={React.useCallback(e => {
              copyToClipboard(makeEmail.get())
              e.preventDefault()
            }, [])}
          >
            Copy code
          </button>
        </form>
        <div className="part">
          <iframe srcDoc={makeEmail.get()} />
        </div>
      </div>
    </>
  )
})

export default IndexPage
