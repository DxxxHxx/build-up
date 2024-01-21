import { Editor } from "@tinymce/tinymce-react";
import { Dispatch, SetStateAction, useState } from "react";

interface ITextEditor {
  value: string;
  onChangeValue: Dispatch<SetStateAction<string>>;
}

export default function TextEditor({ value, onChangeValue }: ITextEditor) {
  // console.log(value);
  const [loading, setLoading] = useState(true);

  return (
    <>
    {loading&&<span className="loading loading-spinner loading-lg">asdad</span>}
      <Editor
        apiKey="5w6bjzt598dkehev6udl8yg0chclcbnfi9kh4h8gcdp650w7"
        init={{
          plugins:
            "tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss ",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough  ",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          menubar: "edit format",
          selector: "textarea",
          height: 500,
          width: "100%",
          resize: false,
          placeholder: "글을 작성 해 주세요.",
          statusbar: false,
        }}
        value={value}
        onEditorChange={onChangeValue}
        onInit={() => setLoading(false)}
      />
    </>
  );
}

interface IShowTextEditor {
  value: string;
}
export function ShowTextEditor({ value }: IShowTextEditor) {
  return (
    <Editor
      apiKey="5w6bjzt598dkehev6udl8yg0chclcbnfi9kh4h8gcdp650w7"
      init={{
        min_height: 500,
        // height:200,
        width: "100%",
        resize: false,
        statusbar: false,
        readonly: true,
        toolbar: "",
        menubar: "",
      }}
      initialValue={value}
      disabled={true}
    />
  );
}
