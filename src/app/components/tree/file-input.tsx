'use client';

import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { useSelectEntity } from '@/states/company';

type FileInputProps = React.ButtonHTMLAttributes<HTMLInputElement>;

export function FileInput({}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { selectedEntity } = useSelectEntity();

  const [importedImg, setImportedImg] = useState<
    { base64: string; height: number; width: number } | undefined
  >(undefined);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result as string;
      const img = new window.Image();
      img.src = base64Image;

      img.onload = () => {
        const { width, height } = img;

        setImportedImg({ base64: base64Image, height, width });
      };
    };
    reader.readAsDataURL(file);
  }

  function importImage() {
    inputRef.current?.click();
  }

  useEffect(() => {
    if (selectedEntity) {
      setImportedImg(undefined);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }, [selectedEntity]);

  return (
    <div className="w-[330px] h-[220px] flex justify-center items-center  rounded-lg overflow-hidden">
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
        accept="image/png, image/jpeg"
      />
      {!importedImg?.base64 ? (
        <Button
          className="bg-transparent h-full w-full hover:bg-transparent border border-dashed border-defaultSlate text-black flex flex-col items-center justify-center"
          onClick={importImage}
        >
          <Plus className="bg-transparent text-title-active-color" />
          <span className="text-title-active-color">
            Adicionar imagem do ativo
          </span>
        </Button>
      ) : (
        <Image
          src={importedImg?.base64}
          alt="Imagem do ativo"
          width={importedImg?.width}
          height={importedImg?.height}
          className="object-cover rounded"
          onClick={importImage}
        />
      )}
    </div>
  );
}
