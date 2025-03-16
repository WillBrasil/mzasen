#!/bin/bash

# Atualiza importações dos componentes de formulários
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/button"|from "@/components/ui/forms/button"|g' {} \;
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/input"|from "@/components/ui/forms/input"|g' {} \;
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/label"|from "@/components/ui/forms/label"|g' {} \;
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/textarea"|from "@/components/ui/forms/textarea"|g' {} \;
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/radio-group"|from "@/components/ui/forms/radio-group"|g' {} \;
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/select"|from "@/components/ui/forms/select"|g' {} \;
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/switch"|from "@/components/ui/forms/switch"|g' {} \;

# Atualiza importações dos componentes de exibição de dados
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/card"|from "@/components/ui/data-display/card"|g' {} \;
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/table"|from "@/components/ui/data-display/table"|g' {} \;

# Atualiza importações dos componentes de feedback
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/alert"|from "@/components/ui/feedback/alert"|g' {} \;
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/use-toast"|from "@/components/ui/feedback/use-toast"|g' {} \;

# Atualiza importações dos componentes de navegação
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/sheet"|from "@/components/ui/navigation/sheet"|g' {} \;

echo "Importações atualizadas com sucesso!" 