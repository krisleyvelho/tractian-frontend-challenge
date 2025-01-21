import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Button } from './button';

interface FileInputProps extends React.ButtonHTMLAttributes<HTMLInputElement> {}

export function FileInput({}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [imageBase64, setImageBase64] = useState<string | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function importImage() {
    inputRef.current?.click();
  }

  return (
    <div className="w-[400px] h-[400px] flex justify-center items-center border border-dashed border-defaultSlate rounded-lg overflow-hidden">
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
        accept="image/png, image/jpeg"
      />
      {!imageBase64 ? (
        <>
          <Button
            className="bg-transparent hover:bg-transparent text-black flex flex-col items-center justify-center"
            onClick={importImage}
          >
            <Plus className="bg-transparent text-title-active-color" />
            <span className="text-title-active-color">
              Adicionar imagem do ativo
            </span>
          </Button>
        </>
      ) : (
        <Image
          src={imageBase64}
          alt="Imagem do ativo"
          width={400}
          height={400}
          className="object-cover rounded-lg"
          onClick={importImage}
        />
      )}
    </div>
  );
}
