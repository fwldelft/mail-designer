import { transformMarkdown } from "./markdown"

export interface TemplateData {
  previewText: string
  unsubscribeButton: boolean
  introductionText: string | undefined
  column1Text: string | undefined
  column2Text: string | undefined
  farewellText: string | undefined
}

export const makeData = (data: TemplateData): any => `
  <mjml>
    <mj-head>
      <mj-title>${data.previewText || ""}</mj-title>
      <mj-preview>${data.previewText || ""}</mj-preview>
      <mj-attributes>
        <mj-section padding="0" />
        <mj-social-element border-radius="1000px" background-color="#C9BCB0" />
        <mj-all font-family="Helvetica, Arial, sans-serif" />
        <mj-class name="title" color="#D73833" />
      </mj-attributes>
      <mj-style inline="inline">
      h1 {
        color: #D73833;
        text-transform: uppercase;
        font-size: 20px;
        margin-bottom: 0;
        padding-bottom: 0;
      }

      h2 {
        text-transform: uppercase;
        font-size: 13px;
        margin-top: 0;
        padding-top: 0;
        font-weight: 900;
      }
    </mj-style>
    </mj-head>
    <mj-body>
      <mj-section padding-top="50px"></mj-section>
      <mj-section background-color="#B29F8F">
        <mj-column>
          <mj-image
            src="https://i.imgur.com/wgVXtmA.png"
            alt="Falling Walls Lab Delft"
            align="left"
            width="100px"
          />
        </mj-column>
      </mj-section>
      <mj-wrapper background-color="white">
        <mj-section>
          <mj-column>
              ${transformMarkdown(data.introductionText) || ""}
          </mj-column>
        </mj-section>
        <mj-section>
          ${
            data.column1Text
              ? `<mj-column>
              ${transformMarkdown(data.column1Text)}
          </mj-column>`
              : ""
          }
          ${
            data.column2Text
              ? `<mj-column>
              ${transformMarkdown(data.column2Text)}
          </mj-column>`
              : ""
          }
        </mj-section>
        <mj-section>
          <mj-column>
              ${transformMarkdown(data.farewellText) || ""}
          </mj-column>
        </mj-section>
      </mj-wrapper>
      <mj-section background-color="#C9BCB0">
        <mj-column>
          <mj-social font-size="15px" icon-size="30px" mode="horizontal">
            <mj-social-element
              name="facebook-noshare"
              alt="Falling Walls Lab Delft on Facebook"
              href="https://www.facebook.com/FallingWallsLabDelft/"
            />
            <mj-social-element
              name="instagram"
              alt="Falling Walls Lab Delft on Instagram"
              href="https://www.instagram.com/falling_walls_lab_delft/"
            />
            <mj-social-element
              name="linkedin-noshare"
              alt="Falling Walls Lab Delft on LinkedIn"
              href="https://www.linkedin.com/company/fwldelft/"
            />
          </mj-social>
        </mj-column>
      </mj-section>
      ${
        data.unsubscribeButton
          ? `
      <mj-section>
        <mj-column>
          <mj-text align="center">
            <p>To unsubscribe please reply to this email with the text "Unsubscribe".</p>
          </mj-text>
        </mj-column>
      </mj-section>
      `
          : ""
      }
      <mj-section padding-bottom="50px">
        <mj-column></mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`
